import React from "react"
import { Tree } from "antd"
import { inject, observer } from "mobx-react"

const DirectoryTree = Tree.DirectoryTree
const TreeNode = Tree.TreeNode

@inject("appStore")
@observer
class Privilege extends React.Component {
  state = {
    expandedKeys: ["all"],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: []
  }

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        checkedKeys: nextProps.value.child
      }
    }
    return null
  }

  onCheck = checkedKeys => {
    console.log("onCheck", checkedKeys)
    this.setState({ checkedKeys })

    const { onChange } = this.props
    const privilegesById = this.props.appStore.getPrivilegesById()

    const parentIds = new Set(
      checkedKeys.map(item => privilegesById[item].parent_id)
    )

    if (onChange) {
      onChange({ parent: parentIds, child: checkedKeys })
    }
  }

  onExpand = expandedKeys => {
    console.log("onExpand", expandedKeys)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }

  render() {
    const privileges = this.props.appStore.getPrivileges()

    return (
      <DirectoryTree
        checkable
        showIcon={false}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
        expandedKeys={this.state.expandedKeys}
        checkedKeys={this.state.checkedKeys}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(privileges)}
      </DirectoryTree>
    )
  }
}

export default Privilege
