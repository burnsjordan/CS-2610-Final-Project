var preEdit = "";

function getNotes() {
    /*for (var i = 0; i < note.list.length; i++) {
        $('#notes').append("<p>" + note.list[i] + "</p><a href='javascript:void(0)' id='del'>Delete     </a><a href='javascript:void(0)' id='edit'>Edit</a>");
    }*/
}

function addNote(str) {
    $.post("../add",
    {
        name: note,
        city: str
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
    $('#notes').empty();
    getNotes();
    console.log("Add");
}

function editNote(str) {
    var index = note.list.indexOf(preEdit);
    console.log(preEdit);
    console.log(note.list[index]);
    if (index > -1) {
        console.log("True");
        note.list[index] = str;
    }
    console.log(note.list[index]);
    $('#notes').empty();
    getNotes();
}

function deleteNote(str) {
    var index = note.list.indexOf(str);
    if (index > -1) {
        note.list.splice(index, 1);
    }
    $('#notes').empty();
    getNotes();
    console.log("Delete");
}

function main() {
    $("#addForm").hide();
    $("#editForm").hide();
    getNotes();
    $('#add').click(function() {
        $("#addForm").show();
        $(this).hide();
    });
    $('body').on('click', "#del", function() {
        $(this).prev().addClass("delete");
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
        preEdit = $(this).prev().prev().text();
        $("#editForm").show();
    });
    $("#addForm").submit(function(e) {
        var input = $('#addBox').val();
        addNote(input);
        e.preventDefault();
        $(this).hide();
        $("#add").show();
    });
    $("#editForm").submit(function(e) {
        var input = $('#editBox').val();
        editNote(input);
        e.preventDefault();
        $(this).hide();
    });
}

$(document).ready(main);
