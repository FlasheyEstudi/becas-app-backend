	import { Injectable, NotFoundException } from '@nestjs/common';
	import { InjectRepository } from '@nestjs/typeorm';
	import { Repository } from 'typeorm';
	import { User } from './entities/user.entity';
	import * as bcrypt from 'bcrypt';
	import { CreateUserDto } from './dto/create-user.dto';
	@Injectable()
	export class UsersService {
	  constructor( 
	    @InjectRepository(User)
	    private usersRepository: Repository<User>,
	  ) {}
	  /**
	   * Crea un nuevo usuario en la base de datos
	   * @param userData - Datos del usuario a crear
	   * @returns - El usuario creado
	   * @throws Error - Si faltan campos requeridos
	   */
	  async create(userData: CreateUserDto): Promise<User> {
	    // Validación mejorada
	    if (!userData.username || !userData.nombre || !userData.email || !userData.password) {
	      throw new Error('Todos los campos son requeridos');
	    }
	    console.log('Creando usuario con datos:', userData);
	    // Generar hash de contraseña
	    const hashedPassword = await bcrypt.hash(userData.password, 10);
	    // Crear usuario con datos consistentes
	    const user = this.usersRepository.create({
	      username: userData.username,
	      nombre: userData.nombre,
	      apellidos: userData.apellidos,  // ← Ahora acepta null
	      email: userData.email,
	      password: hashedPassword,
	      role: userData.role ? userData.role.toLowerCase() : 'estudiante',
	    });
	    console.log('Usuario antes de guardar:', user);
	    const result = await this.usersRepository.save(user);
	    console.log('Usuario guardado:', result);
	    return result;
	  }
	  /**
	   * Busca un usuario por su nombre de usuario
	   * @param username - Nombre de usuario a buscar
	   * @returns - El usuario encontrado o null si no existe
	   */
	  async findOneByUsername(username: string): Promise<User | null> {
	    return this.usersRepository.findOne({
	      where: { username },
	      select: ['id', 'username', 'nombre', 'apellidos', 'email', 'password', 'role'],
	    });
	  }
	  /**
	   * Busca un usuario por su correo electrónico
	   * @param email - Correo electrónico a buscar
	   * @returns - El usuario encontrado o null si no existe
	   */
	  async findOneByEmail(email: string): Promise<User | null> {
	    return this.usersRepository.findOne({
	      where: { email },
	      select: ['id', 'username', 'nombre', 'apellidos', 'email', 'password', 'role'],
	    });
	  }
	  /**
	   * Busca un usuario por su ID
	   * @param id - ID del usuario a buscar
	   * @returns - El usuario encontrado
	   * @throws NotFoundException - Si no se encuentra el usuario
	   */
	  async findOneById(id: number): Promise<User> {
	    const user = await this.usersRepository.findOne({
	      where: { id },
	      select: ['id', 'username', 'nombre', 'apellidos', 'email', 'password', 'role'],
	    });
	    if (!user) {
	      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
	    }
	    return user;
	  }
	  /**
	   * Busca un usuario por su nombre de usuario o correo electrónico
	   * @param identifier - Nombre de usuario o correo electrónico a buscar
	   * @returns - El usuario encontrado o null si no existe
	   */
	  async findOneByUsernameOrEmail(identifier: string): Promise<User | null> {
	    return this.usersRepository.findOne({
	      where: [
	        { username: identifier },
	        { email: identifier }
	      ],
	      select: ['id', 'username', 'nombre', 'apellidos', 'email', 'password', 'role'],
	    });
	  }
	  /**
	   * Valida una contraseña en texto plano con su hash almacenado
	   * @param plainPassword - Contraseña en texto plano
	   * @param hashedPassword - Hash de la contraseña almacenada
	   * @returns - true si la contraseña coincide, false en caso contrario
	   */
	  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
	    console.log('Validando contraseña...');
	    console.log('Contraseña plana:', plainPassword);
	    console.log('Hash almacenado:', hashedPassword);
	    try {
	      const result = await bcrypt.compare(plainPassword, hashedPassword);
	      console.log('Resultado de comparación:', result);
	      return result;
	    } catch (error) {
	      console.error('Error en comparación de contraseña:', error);
	      return false;
	    }
	  }
	  /**
	   * Actualiza la contraseña de un usuario
	   * @param userId - ID del usuario
	   * @param newPassword - Nueva contraseña
	   */
	  async updatePassword(userId: number, newPassword: string): Promise<void> {
	    const hashedPassword = await bcrypt.hash(newPassword, 10);
	    await this.usersRepository.update(userId, { password: hashedPassword });
	  }
	  /**
	   * Crea un usuario administrador si no existe
	   */
	  async seedAdmin(): Promise<void> {
	    const adminExists = await this.findOneByUsername('admin');
	    if (!adminExists) {
	      await this.create({
	        username: 'admin',
	        nombre: 'Administrador',
	        apellidos: 'Sistema',
	        email: 'admin@universidad.edu',
	        password: 'admin123',
	        role: 'admin',
	      });
	    }
	  }
	  /**
	   * Obtiene todos los usuarios
	   * @returns - Lista de todos los usuarios
	   */
	  async findAll(): Promise<User[]> {
	    return this.usersRepository.find();
	  }
	  /**
	   * Busca un usuario por su ID (método alternativo al findOneById para el controlador)
	   * @param id - ID del usuario
	   * @returns - El usuario encontrado
	   */
	  async findOne(id: number): Promise<User> {
	    return this.findOneById(id);
	  }
	  /**
	   * Actualiza un usuario
	   * @param id - ID del usuario a actualizar
	   * @param userData - Datos a actualizar
	   * @returns - El usuario actualizado
	   */
	  async update(id: number, userData: Partial<CreateUserDto>): Promise<User> {
	    const user = await this.findOneById(id);
	    // Actualizar campos solo si existen en los datos de entrada
	    if (userData.username) user.username = userData.username;
	    if (userData.nombre) user.nombre = userData.nombre;
	    if (userData.apellidos !== undefined) user.apellidos = userData.apellidos;
	    if (userData.email) user.email = userData.email;
	    if (userData.password) {
	      user.password = await bcrypt.hash(userData.password, 10);
	    }
	    if (userData.role) user.role = userData.role;
	    return this.usersRepository.save(user);
	  }
	  /**
	   * Elimina un usuario
	   * @param id - ID del usuario a eliminar
	   */
	  async remove(id: number): Promise<void> {
	    const user = await this.findOneById(id);
	    await this.usersRepository.remove(user);
	  }
	}