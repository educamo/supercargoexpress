<?php
// Recibir los datos del formulario
$nombre = $_POST['name'];
$email = $_POST['email'];
$asunto = $_POST['subject'];
$mensaje = $_POST['message'];

// Validar los datos
if (empty($nombre) || empty($email) || empty($asunto) || empty($mensaje)) {
  // Mostrar un mensaje de error si alguno de los campos está vacío
  echo "Por favor, rellene todos los campos.";
} else {
  // Definir el destinatario y el asunto del email
  $destinatario = "ejesust@gmail.com";

  $asunto = "Formulario de contacto: " . $asunto;

  // Definir el encabezado del email
  $encabezado = "From: " . $nombre . " <" . $email . ">\r\n";
  $encabezado .= "Reply-To: " . $email . "\r\n";
  $encabezado .= "Content-type: text/plain; charset=utf-8\r\n";

  // Enviar el email
  if (mail($destinatario, $asunto, $mensaje, $encabezado)) {
    // Mostrar un mensaje de éxito si el email se envió correctamente
    echo "Su mensaje ha sido enviado. Gracias por contactarnos.";
  } else {
    // Mostrar un mensaje de error si el email no se pudo enviar
    echo "Hubo un problema al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.";
  }
}
?>
