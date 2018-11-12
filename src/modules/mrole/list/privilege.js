import React from "react"
import { Tree } from "antd"
import { inject, observer } from "mobx-react"
import { getPrivilegesForTree } from "utils/helper"

const DirectoryTree = Tree.DirectoryTree
const TreeNode = Tree.TreeNode

@inject("appStore")
@observer
class Privilege extends React.Component {
  state = {
    expandedKeys: ["all"],
    selectedKeys: [],
    autoExpandParent: true
  }

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys
    })
  }

  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            dataRef={item}
            selectable={false}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }

  render() {
    const privileges = getPrivilegesForTree(this.props.data)
    return (
      <DirectoryTree
        showIcon={false}
        onExpand={this.onExpand}
        selectedKeys={this.state.selectedKeys}
        className={this.props.className}
      >
        {this.renderTreeNodes(privileges)}
      </DirectoryTree>
    )
  }
}

export default Privilege
