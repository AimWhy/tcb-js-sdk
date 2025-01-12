# 云函数

## 执行函数

`callFunction(object)`

### 请求参数

| 字段     | 类型     | 必填 | 说明       |
| -------- | -------- | ---- | ---------- |
| name     | string   | 是   | 云函数名称 |
| data     | object   | 否   | 云函数参数 |
| callback | function | 否   | 回调函数   |

### 响应参数

| 字段      | 类型   | 必填 | 说明                     |
| --------- | ------ | ---- | ------------------------ |
| code      | string | 否   | 状态码，操作成功则不返回 |
| message   | string | 否   | 错误描述                 |
| result    | object | 否   | 云函数执行结果           |
| requestId | string | 否   | 请求序列号，用于错误排查 |

### 示例代码

```javascript
// promise
app
  .callFunction({
    name: 'test',
    data: { a: 1 }
  })
  .then(res => {});

// callback
app.callFunction(
  {
    name: 'test',
    data: { a: 1 }
  },
  function(err, res) {
    if (err) {
      console.error(err);
    } else {
      console.log(res);
    }
  }
);
```
