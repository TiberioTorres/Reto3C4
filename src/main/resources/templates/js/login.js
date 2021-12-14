$(document).ready(function() {

    $("#iniciar").click(function() {
        let email = $.trim($("#correo").val());
        let password = $.trim($("#contraseña").val());
        if (
            email != null &&
            password != null &&
            email.indexOf("@") != -1 &&
            email.indexOf(".") != -1
        ) {
            $.ajax({
                url: `http://localhost:8080/api/user/${email}/${password}`,
                type: "GET",
                datatype: "JSON",
                contentType: "application/json",
                success: function(result) {
                    sessionStorage.setItem("userName", result.name);
                    sessionStorage.setItem("userEmail", result.email);
                    sessionStorage.setItem("userIdentification", result.identification);
                    sessionStorage.setItem("zonaLogin", result.zone);
                    sessionStorage.setItem("userId", result.id);


                    if (result.id != null) {
                        console.log(result);

                        if (result.type == "ADM") {
                            $("#usuario").empty("");
                            $("#usuario").append("Su Nombre de Usuario es: " + result.name);
                            $("#win-container").append("href='#container-all'");
                            $("#container-all").addClass("active");
                        } else if (result.type == "COORD") {
                            $("#usuario2").empty("");
                            $("#usuario2").append("Su Nombre de Usuario es: " + result.name);

                            $("#zonaLogin").append(result.zone);
                            $("#win-container").append("href='#container2-all'");
                            $("#container2-all").addClass("active");
                        } else if (result.type == "ASE") {
                            $("#usuario3").empty("");
                            $("#usuario3").append("Su Nombre de Usuario es: " + result.name);

                            $("#zonaLogin1").append(result.zone);
                            $("#win-container").append("href='#container3-all'");
                            $("#container3-all").addClass("active");
                        } else {
                            $("#usuario1").empty("");
                            $("#usuario1").append("Su Nombre de Usuario es: " + result.name);
                            $("#win-container").append("href='#container1-all'");
                            $("#container1-all").addClass("active")
                        }

                    } else {
                        alert("No existe un usuario");
                        clearInputs();
                    }

                }

            })
        } else {
            re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if (
                email == "" ||
                password == "")

            {
                alert("Todos los campos son obligatorios");

            } else if (!re.exec(email)) {
                alert("Correo No valido");

            }



        }



    })

})

function clearInputs() {
    $("#correo").value("");
    $("#contraseña").value("");
}