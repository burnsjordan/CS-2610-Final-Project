var preEdit = [];

function addNote(title, str) {
    $.post("../add", {
            title: title,
            body: str
        },
        function(data, status) {
            //alert("Data: " + data + "\nStatus: " + status);
        });
        window.location.reload(true);
    console.log("Add");
}

function editNote(title, newNote) {
    fetch('notes', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'oldTitle' : preEdit.pop(),
                'title': title,
                'body': newNote
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
    console.log("Edit");
}

function deleteNote(title) {
  fetch('notes', {
          method: 'delete',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'title': title,
          })
      })
      .then(res => {
          if (res.ok) return res.json()
      })
      .then(data => {
          console.log(data)
          window.location.reload(true)
      })
    window.location.reload(true);
    console.log("Delete");
}

function main() {
    $("#addForm").hide();
    $("#editForm").hide();
    $('#add').click(function() {
        $("#addForm").show();
        $(this).hide();
    });
    $('body').on('click', "#del", function() {
        $(".temp").remove();
        $('.delete').removeClass('delete');
        $(this).prev().prev().addClass("delete");
        $(this).parent().append("<p class='temp'>Are you sure?</p><a href='javascript:void(0)' id='y' class='temp'>Yes     </a><a href=javascript:void(0) id='n' class='temp'>No</a>");
    });
    $('body').on('click', "#y", function() {
        deleteNote($(".delete").text());
        console.log("Yes");
    });
    $('body').on('click', "#n", function() {
        $(".temp").remove();
        console.log("No");
    });
    $('body').on('click', '#edit', function() {
        preEdit = [];
        preEdit.push($(this).prev().prev().prev().text());
        $("#editForm").show();
    });
    $("#addForm").submit(function(e) {
        var input = $('#addBox').val();
        var title = $('#titleAdd').val();
        addNote(title, input);
        e.preventDefault();
        $(this).hide();
        $("#add").show();
    });
    $("#editForm").submit(function(e) {
        var input = $('#editBox').val();
        var title = $('#titleEdit').val();
        editNote(title, input);
        e.preventDefault();
        $(this).hide();
    });
}

$(document).ready(main);
