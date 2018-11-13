import React from "react"
import PropTypes from "prop-types"
import { Table, Divider } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"
import { pageScrollToTop } from "../../../utils"

@inject("cinemaStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEdit = row => {
    const store = this.props.cinemaStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  handleUpdateFilm = row => {
    const store = this.props.cinemaStore
    store.save({ ...row, update_plan_info: 1 })
  }

  getData = (page, size) => {
    const store = this.props.cinemaStore
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
      title: "影院名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "所属地区",
      key: "area",
      render: (text, record) => {
        return `${record.province} ${record.city} ${record.county}`
      }
    },
    {
      title: "当前状态",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        return status === 1 ? "正常" : "下线"
      }
    },
    {
      title: "中鑫ID",
      dataIndex: "zx_id",
      key: "zx_id"
    },
    {
      title: "天工ID",
      dataIndex: "tg_id",
      key: "tg_id"
    },
    {
      title: "影院URL识别参数",
      dataIndex: "param",
      key: "param"
    },
    {
      title: "微信支付key",
      dataIndex: "wx_key",
      key: "wx_key"
    },
    {
      title: "微信serect",
      dataIndex: "wx_secret",
      key: "wx_secret"
    },
    {
      title: "微信mch-id",
      dataIndex: "wx_mch_id",
      key: "wx_mch_id"
    },
    {
      title: "微信APPID",
      dataIndex: "wx_app_id",
      key: "wx_app_id"
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.handleEdit.bind(this, record)}>
            编辑
          </a>
          <Divider type="vertical" />
          {/* <Popconfirm
            title="确定要删除?"
            onConfirm={() => this.handleDelete(record)}
          >
            <a href="javascript:;">删除</a>
          </Popconfirm> */}
          {/* <Divider type="vertical" /> */}
          <a
            href="javascript:;"
            onClick={this.handleUpdateFilm.bind(this, record)}
          >
            更新排片
          </a>
        </span>
      )
    }
  ]

  render() {
    const store = this.props.cinemaStore
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
