var update = document.getElementById('update')
var del = document.getElementById('delete')
//function for update
update.addEventListener('click', function () {
  fetch('age', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'ana',// given name and age will be added to the list
      'ages': '12'
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })
})
//function for delete
del.addEventListener('click', function () {
  fetch('age', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'amit'//name as amit will be deleted and if repeated name value is present the top most will be removed
    })
  }).then(function (response) {
    window.location.reload()
  })
})