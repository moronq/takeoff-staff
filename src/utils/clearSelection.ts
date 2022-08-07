export const clearSelection = () => {
  let parent = document.querySelector('.userList')
  let userItem = parent!.querySelectorAll('.userItem')
  userItem.forEach((el) => el.classList.remove('activeUser'))
}
