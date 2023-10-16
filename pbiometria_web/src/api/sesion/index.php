<?php
switch ($_SERVER['REQUEST_METHOD']) {

    // CASO GET
	case 'GET':
		session_start();
		if(!isset($_SESSION['user'])) {
			http_response_code(401);
		} else {
			http_response_code(200);
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
			header('Content-Type: application/json; charset=utf-8');
			echo json_encode($_SESSION ['user']);
		}
		break;

    //
    // CASO POST
    //
	case 'POST':

        require_once '../includes/connection.php';
        if(!isset($connexion)) die();

		$usuario = $_POST['usuario'];
		$password = $_POST['password'];

		$sql = "SELECT * 
	            FROM `usuarios` 
	            WHERE `usuarios`.`name` = '$usuario' AND `usuarios`.`password` = '$password'";


		$resultado = mysqli_query($connexion, $sql);

		if (mysqli_affected_rows($connexion) === 1) {
			$registro = mysqli_fetch_assoc($resultado);

			session_start();
			$_SESSION['user'] = $registro;

			$salida = [];
			$salida['name'] = $registro['name'];
			$salida['rol'] = $registro['rol'];

			http_response_code(200);

			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
			header('Content-Type: application/json; charset=utf-8');

			echo json_encode($salida);
		} else {
			http_response_code(401);
		}
		break;

    //
    // CASO DELETE
    //
	case 'DELETE':
		// Inicializar la sesión.
		session_start();

		// Destruir todas las variables de sesión.
		$_SESSION = array();

		// Si se desea destruir la sesión completamente, borre también la cookie de sesión.
		if (ini_get("session.use_cookies")) {
			$params = session_get_cookie_params();
			setcookie(session_name(), '', time() - 42000,
				$params["path"], $params["domain"],
				$params["secure"], $params["httponly"]
			);
		}

		// Finalmente, destruir la sesión.
		session_destroy();
		break;
	default:
		http_response_code(405);
}