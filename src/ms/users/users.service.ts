import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  // Crear usuario con validaciones
  async create(userData: CreateUserDto): Promise<User> {
    if (!userData.username || !userData.nombre || !userData.email || !userData.password) {
      throw new BadRequestException('Todos los campos son requeridos');
    }

    const emailExists = await this.usersRepository.findOne({ where: { email: userData.email } });
    if (emailExists) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    const usernameExists = await this.usersRepository.findOne({ where: { username: userData.username } });
    if (usernameExists) {
      throw new BadRequestException('El nombre de usuario ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.usersRepository.create({
      username: userData.username,
      nombre: userData.nombre,
      apellidos: userData.apellidos || null,
      email: userData.email,
      password: hashedPassword,
      role: userData.role ? userData.role.toLowerCase() : 'estudiante',
    });

    return this.usersRepository.save(user);
  }

  // Buscar usuario por ID
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  // Alias para findOne (para controladores existentes)
  async findOne(id: number): Promise<User> {
    return this.findOneById(id);
  }

  // Buscar por email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // Buscar por username
  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // Buscar por username o email
  async findOneByUsernameOrEmail(identifier: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [
        { username: identifier },
        { email: identifier }
      ]
    });
  }

  // Validar contraseña
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Actualizar contraseña
  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { password: hashedPassword });
  }

  // Actualizar usuario
  async update(id: number, userData: Partial<CreateUserDto>): Promise<User> {
    const user = await this.findOneById(id);
    if (userData.username) user.username = userData.username;
    if (userData.nombre) user.nombre = userData.nombre;
    if (userData.apellidos !== undefined) user.apellidos = userData.apellidos;
    if (userData.email) user.email = userData.email;
    if (userData.password) user.password = await bcrypt.hash(userData.password, 10);
    if (userData.role) user.role = userData.role.toLowerCase();
    return this.usersRepository.save(user);
  }

  // Eliminar usuario
  async remove(id: number): Promise<void> {
    const user = await this.findOneById(id);
    await this.usersRepository.remove(user);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Crear admin si no existe
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
}
