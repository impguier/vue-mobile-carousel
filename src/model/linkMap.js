import Node from './linkNode'
class LinkMap {
  constructor () {
    this.head = null
    this.tail = null
    this.length = 0
  }
  add (element) {
    let node = new Node(element)
    let current
    node.pos = this.length
    if (!this.head) {
      this.head = node
      this.tail = node
      this.active = this.head
    } else {
      current = this.tail
      node.prev = current
      node.next = this.head
      current.next = node
      this.head.prev = node
      this.active = node
      this.tail = node
    }
    this.length++
  }
  size () {
    return this.length
  }
  getActive () {
    return this.active
  }
  setActive (pos) {
    let node = this.getElementByIndex(pos)
    node.active = true
    this.active = node
  }
  getElementByIndex (ind) {
    let current = this.head
    let result
    while (current.next) {
      if (current.pos === ind) {
        result = current
        break
      } else {
        if (current === this.tail) {
          throw new Error("Doesn't match any LinkList element")
        }
        current = current.next
      }
    }
    return result
  }
  getActiveAndActiveSibling () {
    let ret
    if (this.loop) {
      ret = [
        this.active.prev,
        this.active,
        this.active.next
      ]
    } else {
      ret = [
        this.active.prev,
        this.active,
        this.active.next
      ]
    }
    return ret
  }
}
export default LinkMap
