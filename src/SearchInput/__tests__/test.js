import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import SearchInput from '../index'

describe('SearchInput', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <SearchInput onSearch={handleClick} className="test" />
      )
      const container = findDOMNode(instance)
      expect(container.className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <SearchInput onSearch={handleClick} style={{color: 'red'}}/>
      )
      const container = findDOMNode(instance)
      expect(container.style.color).toBe('red')
    })

    it('size is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <SearchInput onSearch={handleClick} size="sm" />
      )
      const container = findDOMNode(instance)
      expect(container.className.split(' ')).toContain('sm')
    })

    it('label is ok', () => {
      const handleClick = jest.fn()
      const text = '查询'
      const instance = TestUtils.renderIntoDocument(
        <SearchInput onSearch={handleClick} label={text} />
      )
      const container = findDOMNode(instance)
      const button = container.querySelector('button')
      expect(button.innerHTML).toContain(text)
    })

    it('defaultValue is ok', () => {
      const handleClick = jest.fn()
      const value = "abc"
      const instance = TestUtils.renderIntoDocument(
        <SearchInput defaultValue={value} onSearch={handleClick}/>
      )
      const container = findDOMNode(instance)
      const input = container.querySelector('input')
      expect(input.value).toEqual(value)
    })
  })

  describe('event test', () => {
    it('onSearch is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <SearchInput onSearch={handleClick} />
      )
      const container = findDOMNode(instance)
      const button = container.querySelector('button')
      TestUtils.Simulate.click(button)
      expect(handleClick).toBeCalled()
      expect(handleClick.mock.calls.length).toBe(1)
      expect(handleClick.mock.calls[0][0]).toEqual('')
    })
    it('onChange is ok', () => {
      const handleClick = jest.fn()
      const handleChange = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <SearchInput onSearch={handleClick} onChange={handleChange}  />
      )
      const container = findDOMNode(instance)
      const input = container.querySelector('input')

      input.value = 'abc'
      TestUtils.Simulate.change(input)
      expect(handleChange).toBeCalled()
      expect(handleChange.mock.calls.length).toBe(1)
      expect(handleChange.mock.calls[0][0]).toEqual('abc')

      input.value = '1'
      TestUtils.Simulate.change(input)
      expect(handleChange).toBeCalled()
      expect(handleChange.mock.calls.length).toBe(2)
      expect(handleChange.mock.calls[1][0]).toEqual('1')
    })
  })
})