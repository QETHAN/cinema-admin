import React from "react"
import PropTypes from "prop-types"
import { Table, Divider } from "antd"
import { observer, inject } from "mobx-react"
import { pageScrollToTop } from "utils"
import "./index.less"

@inject("scheduleStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEdit = row => {
    const store = this.props.scheduleStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  handleEditOnsale = row => {
    const store = this.props.scheduleStore
    const data = { id: row.id, status: row.status === 1 ? 0 : 1 }
    store.save(data)
  }

  getData = (page, size) => {
    const store = this.props.scheduleStore
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
      dataIndex: "cinema_info.name",
      key: "cinema_info.name"
    },
    {
      title: "电影名称",
      dataIndex: "film_info.film_name",
      key: "film_info.film_name"
    },
    {
      title: "排场时间",
      dataIndex: "start_time",
      key: "start_time"
    },
    {
      title: "上映时间",
      dataIndex: "film_info.publish_date",
      key: "film_info.publish_date"
    },
    {
      title: "价格时间段",
      align: "center",
      dataIndex: "date_price_arr1",
      key: "date_price_arr1",
      render: date_price_arr1 => {
        return (
          <ul className="price-time">
            {date_price_arr1.map(item => {
              return item.timeSpan
            })}
          </ul>
        )
      }
    },
    {
      title: "会员价格",
      align: "center",
      dataIndex: "date_price_arr2",
      key: "date_price_arr2",
      render: date_price_arr2 => {
        return (
          <ul className="price-time">
            {date_price_arr2.map(item => {
              return (
                <li key={item.start_time + "-price"}>
                  <p>{item.price}</p>
                </li>
              )
            })}
          </ul>
        )
      }
    },
    {
      title: "VIP价格",
      align: "center",
      dataIndex: "date_price_arr3",
      key: "date_price_arr3",
      render: date_price_arr3 => {
        return (
          <ul className="price-time">
            {date_price_arr3.map(item => {
              return (
                <li key={item.start_time + "-vip-price"}>
                  <p>{item.vip_price}</p>
                </li>
              )
            })}
          </ul>
        )
      }
    },
    {
      title: "特惠价格",
      align: "center",
      dataIndex: "date_price_arr4",
      key: "date_price_arr4",
      render: date_price_arr4 => {
        return (
          <ul className="price-time">
            {date_price_arr4.map(item => {
              return (
                <li key={item.start_time + "-sale-price"}>
                  <p>{item.sale_price}</p>
                </li>
              )
            })}
          </ul>
        )
      }
    },
    {
      title: "特惠票数量",
      align: "center",
      dataIndex: "sale_total",
      key: "sale_total"
    },
    {
      title: "累计出售",
      align: "center",
      dataIndex: "score",
      key: "score"
    },
    {
      title: "销售额",
      dataIndex: "want_see_count",
      key: "want_see_count"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: status => {
        return status === 1 ? (
          <span>上架</span>
        ) : (
          <span style={{ color: "#d9d9d9" }}>下架</span>
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
            onClick={this.handleEditOnsale.bind(this, record)}
          >
            {record.status === 1 ? "下架" : "上架"}
          </a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={this.handleEdit.bind(this, record)}>
            修改价格
          </a>
        </span>
      )
    }
  ]

  render() {
    const store = this.props.scheduleStore
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
