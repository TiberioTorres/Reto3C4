function closeForm() {
    $(".form-popup-bg").removeClass("is-visible");
}

function openForm(id) {
    $(".form-popup-bg").addClass("is-visible");
    $("#id_usr").val(id);
}


$(document).ready(function($) {
    /* Contact Form Interactions */
    $("#btnOpenForm").on("click", function(event) {
        event.preventDefault();

        $(".form-popup-bg").addClass("is-visible");
    });

    //close popup when clicking x or off popup

    $(".form-popup-bg").on("click", function(event) {
        if (
            $(event.target).is(".form-popup-bg") ||
            $(event.target).is("#btnCloseForm")
        ) {
            event.preventDefault();
            $(this).removeClass("is-visible");
        }
    });
});



$("document").ready(function() {
    getUsrs();
});

function getUsrs() {
    $.ajax({
        url: "http://localhost:8084/api/user/all",
        type: "GET",
        datatype: "JSON",
        contentType: "application/json",
        success: function(response) {
            console.log(response);
            showUsrs(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {},
    });
}

function showUsrs(response) {
    let table = "<table>";
    for (i = 0; i < response.length; i++) {
        table += "<tr>";
        table += "<td>" + response[i].identification + "</td>";
        table += "<td>" + response[i].name + "</td>";
        table += "<td>" + response[i].address + "</td>";
        table += "<td>" + response[i].cellPhone + "</td>";
        table += "<td>" + response[i].email + "</td>";
        table += "<td>" + response[i].password + "</td>";
        table += "<td>" + response[i].zone + "</td>";
        table += "<td>" + response[i].type + "</td>";
        table += '<td><center><button onclick="getUsrById(' + response[i].id + ')">Actualizar</button><center></td>';
        table += '<td><center><button onclick="deleteUsr(' + response[i].id + ')">Borrar</button><center></td>';
        table += "</tr>";

    }

    table += "</table>";
    $("#cloneList tbody").html(table);
}

function getUsrById(id) {
    jQuery.support.cors = true;
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8084/api/user/" + id,
        type: 'GET',
        success: function(response) {
            console.log(response);
            let usr = response;
            $("#identificacion-usr").val(usr.identification);
            $("#nombre-usr").val(usr.name);
            $("#direccion-usr").val(usr.address);
            $("#celular-usr").val(usr.cellPhone);
            $("#email-usr").val(usr.email);
            $("#contrasena-usr").val(usr.password);
            $("#zona-usr").val(usr.zone);
            $("#tipo-usr").val(usr.type);
            openForm(id);
        }
    })
}

function getJSONUpdate(id) {
    return {
        id: $("#id_usr").val(),
        identification: $("#identificacion-usr").val(),
        name: $("#nombre-usr").val(),
        address: $("#direccion-usr").val(),
        cellPhone: $("#celular-usr").val(),
        email: $("#email-usr").val(),
        password: $("#contrasena-usr").val(),
        zone: $("#zona-usr").val(),
        type: $("#tipo-usr").val(),
    };
}

$("#btn_post_update").click(function() {
    let data = getJSONUpdate();
    let url = "http://localhost:8084/api/user/update";

    // PETICION PUT (UPDATE)
    $.when(jqueryPUT(url, data)).done(function() { // AJAX => ASINCRONO
        alert("Se ha actualizado correctamente!");
        closeForm();

    });
});

function jqueryPUT(url, data) {
    return $.ajax({
        url: url,
        type: "PUT",
        datatype: "JSON",
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

function traerDatosUpdate() {
    return [$()];
}


function updateUsr(id) {

    if ($("#identificacion-usr").val().length == 0 ||
        $("#nombre-usr").val().length == 0 ||
        $("#direccion-usr").val().length == 0 ||
        $("#celular-usr").val().length == 0 ||
        $("#email-usr").val().length == 0 ||
        $("#contrasena-usr").val().length == 0 ||
        $("#zona-usr").val().length == 0 ||
        $("#tipo-usr").val().length == 0) {
        alert("Por favor llene todos los campos de registro solicitados.");
    } else {

        let usr = {
            id: id,
            identification: $("#identificacion-usr").val(),
            name: $("#nombre-usr").val(),
            address: $("#direccion-usr").val(),
            cellPhone: $("#celular-usr").val(),
            email: $("#email-usr").val(),
            password: $("#contrasena-usr").val(),
            zone: $("#zona-usr").val(),
            type: $("#tipo-usr").val()
        }
        console.log(usr.id);
        let dataToSend = JSON.stringify(usr);

        $.ajax({
            url: "http://localhost:8084/api/user/update",
            type: "PUT",
            datatype: "JSON",
            data: dataToSend,
            contentType: "application/json",
            success: function(response) {
                console.log(response);
                $("#usrList").empty();
                getUsrs();
                console.log("Se ha actualizado el registro del producto.");
                alert("Se ha actualizado el registro del producto.")
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("No se ha actualizado el registro del usuario, por favor verifique.");
                alert("No se ha actualizado el registro del usuario, por favor verifique.")
            }
        });
        console.log(response);
    }
}

/*
function saveProduct(){

  if ($("#marca-usr).val().length == 0 || $("#procesador-usr).val().length == 0 || $("#so-usr).val().length==0
  || $("#descripcion-usr).val().length == 0 || $("#memoria-usr).val().length == 0 || $("#stock-usr).val().length== 0  
  || $("#precio-usr).val().length==0 || $("#cantidad-usr).val().length==0) {

      alert("Por favor llene todos los campos de registro solicitados.");

  }
  else{

      let usr = {
          brand:$("#marca-usr).val(),
          procesor:$("#procesador-usr).val(),
          os:$("#so-usr).val(),
          description:$("#descripcion-usr).val(),
          memory:$("#memoria-usr).val(),
          hardDrive:$("#hdd-usr).val(),
          availability:$("#stock-usr).val(),
          price:$("precio-usr).val(),
          quantity:$("#cantidad-usr).val(),
          photography:$("#foto-usr).val()     
      }

      console.log(usr);
      let dataToSend=JSON.stringify(usr);

      $.ajax({
          url: "http://localhost:8084/api/clone/new",
          type:"POST",
          datatype:"JSON",
          data: dataToSend,
          contentType: "application/json",
          success: function(response){
              console.log(response);
              $("#productList").empty();
              $("#marca-usr).val("");
              $("#procesador-usr).val("");
              $("#so-usr).val("");
              $("#descripcion-usr).val("");
              $("#memoria-usr).val("");
              $("#hdd-usr).val("");
              $("#stock-usr).val("");
              $("#precio-usr).val("");
              $("#cantidad-usr).val("");
              $("#foto-usr).val("");
              getUsrs();
              console.log("Se ha añadido el registro del producto al sistema.");
              alert("Se ha añadido el registro del producto al sistema.")
          },
          error: function(jqXHR, textStatus, errorThrown){
              console.log("No se ha añadido el registro del producto, por favor verifique.");
              alert("Se ha añadido el registro del producto, por favor verifique.")
          }
      });          

  }
}
*/

function deleteUsr(id) {

    let usr = {
        id: id
    };

    console.log(usr);
    let dataToSend = JSON.stringify(usr);

    $.ajax({
        url: "http://localhost:8084/api/user/" + id,
        type: "DELETE",
        datatype: "JSON",
        data: dataToSend,
        contentType: "application/json",
        success: function(response) {
            console.log(response);
            $("#usrList").empty();
            getUsrs();
            console.log("Se ha eliminado el registro del Usuario.");
            alert("Se ha eliminado el registro del usuario.")
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("No se ha eliminado el registro del usuario, por favor verifique.");
            alert("No se ha eliminado el registro del usuario, por favor verifique.")
        }
    });

}