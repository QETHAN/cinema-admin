import React from "react"
import PropTypes from "prop-types"
import { Table } from "antd"
import { observer, inject } from "mobx-react"
import { canEdit } from "utils/helper"
import "./index.less"
import { pageScrollToTop } from "../../../utils"

@inject("merchantStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  resources = {
    "1": "当日要提醒",
    "2": "会员登记",
    "3": "会员类型",
    "4": "库存管理",
    "5": "卖品管理",
    "6": "活动管理"
  }

  handleEdit = row => {
    const store = this.props.merchantStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  getData = (page, size) => {
    const store = this.props.merchantStore
    store.setPagination(page, size)
    store.getData()
  }

  handlePageChange = (page, size) => {
    this.getData(page, size)
    pageScrollToTop()
  }

  handleSizeChange = (current, size) => {
    this.getData(current, size)
  }

  columns = [
    {
      title: "商户名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "所属地区",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "当前状态",
      dataIndex: "status",
      key: "status",
      render: status => (status === 1 ? "在线" : "下线")
    },
    {
      title: "账号",
      dataIndex: "merchant_admin_username",
      key: "merchant_admin_username"
    },
    {
      title: "联系人信息",
      dataIndex: "user_info",
      key: "user_info"
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "影院类型",
      dataIndex: "cinema_type",
      key: "cinema_type",
      render: type => (type === 1 ? "独立" : "连锁")
    },
    {
      title: "生效日期",
      dataIndex: "start_time",
      key: "start_time"
    },
    {
      title: "功能选择",
      dataIndex: "resource",
      key: "resource",
      render: resource => {
        const keys = resource.split(",")
        return (
          <ul style={{ listStyle: "none", marginBottom: 0, padding: 0 }}>
            {keys &&
              keys.map((key, idx) => {
                return <li key={this.resources[key]}>{this.resources[key]}</li>
              })}
          </ul>
        )
      }
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            href="javascript:;"
            onClick={this.handleEdit.bind(this, record)}
            disabled={!canEdit(this.props.route.child_functions)}
          >
            编辑
          </a>
          {/* <Divider type="vertical" /> */}
          {/* <Popconfirm
            title="确定要删除?"
            onConfirm={() => this.handleDelete(record)}
          >
            <a href="javascript:;">删除</a>
          </Popconfirm> */}
        </span>
      )
    }
  ]

  render() {
    const store = this.props.merchantStore
    return (
      <Table
        loading={store.listLoading}
        columns={this.columns}
        rowKey={record => record.id}
        dataSource={this.props.data}
        pagination={{
          showSizeChanger: true,
          current: store.page,
          pageSize: store.size,
          total: store.total,
          onChange: this.handlePageChange,
          onShowSizeChange: this.handleSizeChange
        }}
      />
    )
  }
}

export default List
