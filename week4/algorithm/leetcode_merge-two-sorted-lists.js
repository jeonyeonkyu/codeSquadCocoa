//https://leetcode.com/problems/merge-two-sorted-lists/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {

  let result = new ListNode();
  let rr = result;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      result.next = new ListNode(l1.val);
      l1 = l1.next;
    } else {
      result.next = new ListNode(l2.val);
      l2 = l2.next;
    }
    result = result.next;
  }

  if (l1 !== null) {
    result.next = l1;
  } else if (l2 !== null) {
    result.next = l2
  }

  return rr.next
};