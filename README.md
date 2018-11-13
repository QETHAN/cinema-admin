# BUG:

1. 商户管理，多次弹出修改成功，关闭抽屉，再进入 (已解决)
2. 列表页，控制分页参数

```
    getData = (page, size) => {
        this.setState({
            pagination: { current: page, pageSize: size }
        })
        this.props.categoryStore.getData({ page: page, "per-page": size })
    }


    handlePageChange = (page, size) => {
        this.getData(page, size)
    }

    handleSizeChange = (current, size) => {
        this.getData(current, size)
    }
```

3. 卖品管理，查询接口对接 （已解决）
4. 各模块查询，检查 (已解决)
5. 点击分页，当前页面回到顶部
6. 模块

```
   {
        "name": "会员管理",
        "route": "/user",
        "child_functions": ["新增", "编辑", "删除"]
   },
   {
        "route": "/category",
        "name": "分类管理",
        "child_functions": ["新增", "编辑", "删除"]
   },
   {
        "route": "/goods",
        "name": "卖品管理",
        "child_functions": ["新增", "编辑", "删除"]
   },
   {
        "route": "/package",
        "name": "套餐管理",
        "child_functions": ["新增", "编辑", "删除"]
   },
   {
        "route": "/schedule",
        "name": "排片管理",
        "child_functions": ["新增", "编辑", "删除"]
   },
   {
        "name": "影院管理",
        "route": "/cinema",
        "child_functions": ["新增", "编辑", "删除"]
   },
   {
        "name": "影片管理",
        "route": "/movie",
        "child_functions": ["新增", "编辑", "删除"]
   },
   {
        "name": "操作记录",
        "route": "/log",
        "child_functions": []
   }
```
