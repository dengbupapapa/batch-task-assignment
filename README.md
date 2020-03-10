# batch-task-assignment

Batch task assignment, reduction of batch task processor trigger, control batch task processor single receive.

## Frequently Asked Questions
> Frequent calls to batch processing interfaces.
> The interface frequently calls methods for batch layout calculation.

### install
```
npm i batch-task-assignment --save
```

### [simple example](https://github.com/dengbupapapa/batch-task-assignment/blob/master/test.html):

```
<script type="text/javascript" src="./index.umd.js"></script>
<script type="text/javascript">

function ajax({sucess,data}){
    setTimeout(function(){
        for(let i=0; i<data.length; i++){
            data[i] = 'sucess'+JSON.stringify(data[i])
        }
        // console.log(data);
        sucess(data);
    },100)
}


//setting config
let dispose = batchTaskAssignment({delay:100,unitMaximum:20});
//definition dispose
let task = dispose(function(unitData,resolves){

    ajax({
        data:unitData,
        sucess:function(result){

            resolves(result);

        },
        error(e){
            resolves(Array(unitData.length).fill(e));
        }
    })



})

//definition task
function myTask(data){
    return task(data)
}

function test(){

    myTask([{a:1,b:2},{a:3,b:4}]).then((value)=>{});
    myTask([{a:5,b:6},{a:7,b:8},[{a:9,b:10},{a:11,b:12}]]).then((value)=>{});
    myTask([{a:13,b:14}]).then((value)=>{});

}

test();
</script>
```

## batchTaskAssignment (default {delay:200, unitMaximum:10})

Configure jitter time, single processing data length. return dispose

``` js

let dispose = batchTaskAssignment({delay:100,unitMaximum:20});

```

## dispose (default undefined : require)

Definition dispose callback Function.
    . unitData: Data processed per unit length.
    . resolves: Data processing complete callback, Need result data.

``` js
let task = dispose(function(unitData,resolves){

    ajax({
        data:unitData,
        sucess:function(result){

            resolves(result);

        },
        error(e){
            resolves(Array(unitData.length).fill(e));
        }
    })

})
```
## task (default undefined)

Task-related data

``` js
task(data);
```
