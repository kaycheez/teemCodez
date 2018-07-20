$(document).ready(function() {
  // attach event listener to buttons(input)
  $('.store-btn').on('click', function() {

    localStorage.setItem('hrext', 'iono about three')
  })
  $('.get-btn').on('click', function() {

    console.log(localStorage.getItem('hrext'))
  })
  $('.delete-btn').on('click', function() {

    console.log(localStorage.removeItem('hrext'))
  })
  // create function stub for read/write/delete
});