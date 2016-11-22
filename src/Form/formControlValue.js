/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import update from 'react-update'

export default (form, formItem) => {
  const name = formItem.props.name
  return {
    get() {
      const data = form.state.data[name]
      if (!formItem.props.multiple) {
        return data
      } else {
        if (data instanceof Array) {
          return data[form.multipleMap[formItem.uuid]]
        }
        return null
      }
    },
    set(value) {
      const formData = form.state.data
      let nextData
      if (!formItem.props.multiple) {
        nextData = update(formData, 'set', name, value)
      } else {
        if (!formData[name]) {
          formData[name] = []
        }
        nextData = update(formData, 'set', [name, form.multipleMap[formItem.uuid]], value)
      }
      form.setState({data: nextData})
      form.props.onChange && form.props.onChange(nextData)
    }
  }
}
