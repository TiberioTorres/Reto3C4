$(document).ready(function () {
  jQuery.support.cors = true;
  $.ajax({
    url: "http://localhost:8080/api/clone/all",
    type: "GET",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    cache: false,
    success: function (result) {
      let i = 0;
      let marca;
      let procesador;
      let so;
      let descripcion;
      let memoria;
      let hdd;
      let stock;
      let precio;
      let cantidad;
      let foto;
      $("#cloneList tbody").empty();
      for (i = 0; i < result.length; i++) {
        marca = result[i]["brand"];
        procesador = result[i]["procesor"];
        so = result[i]["os"];
        descripcion = result[i]["description"];
        memoria = result[i]["memory"];
        hdd = result[i]["hardDrive"];
        stock = result[i]["availability"];
        precio = result[i]["price"];
        cantidad = result[i]["quantity"];
        foto = result[i]["photography"];
        salidaFila = `<tr><td> ${marca}  </td><td>  ${procesador}  </td><td>  
                    so  </td><td>  ${descripcion}  </td><td>  ${memoria} 
                    </td><td>  ${hdd}  </td><td>  ${stock}  </td><td> ${precio} </td><td>
                       ${cantidad}  </td><td> ${foto} </td><td>  <button class='button del-button' button style='color:#ff4500' onclick='deleteClone( result[i]["id"] )'>Borrar</button>  
                    <a href='#container-all'><button class='button' id='btn-abrir-popup' <button type="button"  style='color:#ff4500' onclick='updateClone( result[i]["id"] )'> Editar </button></a> </td><tr>`;
        $("#cloneList tbody").append(salidaFila);
      } //Fin del for
    },
  });
});