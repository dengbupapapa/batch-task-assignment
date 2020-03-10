export default function batchTaskAssignment({
    delay=200,
    unitMaximum=10
}={
    delay:200,
    unitMaximum:10
}) {

    let timer;
    let working;

    return function dispose(disposeFn){

        //任务仓库相关参数
        let resolves = [];
        let datas = [];
        let dataLengths = [];
        let tasks = {
            resolves,
            datas,
            dataLengths
        };

        //触发时机
        function timing(){

            if(timer) clearTimeout(timer);

            if(tasks.datas.length >= unitMaximum){
                return unitMaximumSpliceTasksAndDisposeFn();
            }

            timer = setTimeout(function(){
                unitMaximumSpliceTasksAndDisposeFn();
            }, delay);

        }

        //按单次处理量限制截取任务仓库数据和防抖回调
        function unitMaximumSpliceTasksAndDisposeFn(){

            let unitDatas = datas.splice(0,unitMaximum);

            working = true;
            disposeFn(
                unitDatas,
                resolvesCallback
            );

        }

        //响应结果相关参数
        //因为不够取而导致遗留到下一阶段的暂存区
        let unitResultTemporaryStorage = [];

        function resolvesCallback(unitResult){

            //在前面插入上一次递归遗留的数据
            unitResult.unshift(...unitResultTemporaryStorage.splice(0));

            //按dataLengths正序取result
            while (true){

                //不够取就break，留给下一个递归。
                if(unitResult.length < tasks.dataLengths[0] || !!!tasks.dataLengths[0]){
                    break;
                }

                //够取直接取
                let currentItemResult = unitResult.splice(0,tasks.dataLengths[0]);
                tasks.resolves[0](currentItemResult);
                tasks.resolves.shift();
                tasks.dataLengths.shift();

            }

            //剩余部分放暂存区
            unitResultTemporaryStorage.push(...unitResult);

            //如果还有未处理的数据那么递归
            if(tasks.datas.length > 0){
                timing();
            //否则重置状态
            }else{
                working = false;
            };

            /*
                问题
                可能会存在并行的unitMaximumSpliceTasksAndDisposeFn 导致 unitResult和 resolve、lengths不对应

                解决办法
                当有超出单次处理量长度时，关闭防抖功能，使用直接触发功能进行递归依次请求并设置标识处理中，后进入的任务也排列到其中，除非在下次任务进入前递归完毕，不然不重置标识。
            */

        }

        return function task(data) {

            return new Promise(function(resolve){

                //任务仓库存储
                tasks.resolves.push(resolve);
                tasks.datas.push(...data);
                tasks.dataLengths.push(data.length);

                if(working) return 'working';

                timing();

            });

        }
    }

}