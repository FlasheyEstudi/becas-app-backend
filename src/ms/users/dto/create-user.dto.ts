	export class CreateUserDto {
	  username: string;       // Nombre de usuario único
	  nombre: string;         // Nombre del usuario
	  apellidos: string | null; // Apellidos del usuario (puede ser nulo)
	  email: string;          // Correo electrónico único
	  password: string;       // Contraseña (se almacenará encriptada)
	  role?: string;          // Rol del usuario (opcional, por defecto 'estudiante')
	}