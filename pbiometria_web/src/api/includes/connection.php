<?php
$bbdd_servidor = 'localhost'; // No cambiar
$bbdd_nombre = 'p_biometria'; // Reemplazar con el nombre de la bbdd en plesk mmersan_pw_gti_23
$bbdd_user = 'root'; // Reemplazar con el usuario creado para la bbdd en plesk mmersan_pw_gti_23
$bbdd_password = ''; // Reemplazar con la contraseña del usuario de la bbdd en plesk l9pvJ32@6

try {
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password, $bbdd_nombre);
} catch (Exception $e) {
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}

mysqli_query($connexion, 'SET NAMES utf8mb4');