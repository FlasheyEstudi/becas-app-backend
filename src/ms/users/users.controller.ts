	import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
	import { UsersService } from './users.service';
	import { CreateUserDto } from './dto/create-user.dto';
	import { User } from './entities/user.entity';
	import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
	import { RolesGuard } from '../../auth/roles.guard';
	import { Roles } from '../../auth/roles.decorator';
	@Controller('users')
	@UseGuards(JwtAuthGuard, RolesGuard)
	export class UsersController {
	  constructor(private readonly usersService: UsersService) {}
	  /**
	   * Crea un nuevo usuario
	   * @param userData - Datos del usuario a crear
	   * @returns - El usuario creado
	   */
	  @Post()
	  @Roles('admin')
	  async create(@Body() userData: CreateUserDto) {
	    // CORRECCIÓN: Manejar apellidos nulos
	    const userDataWithNulls = {
	      ...userData,
	      apellidos: userData.apellidos || null,
	    };
	    const user = await this.usersService.create(userDataWithNulls);
	    return user;
	  }
	  /**
	   * Obtiene todos los usuarios
	   * @returns - Lista de todos los usuarios
	   */
	  @Get()
	  @Roles('admin')
	  async findAll() {
	    return this.usersService.findAll();
	  }
	  /**
	   * Obtiene un usuario por su ID
	   * @param id - ID del usuario
	   * @returns - El usuario encontrado
	   */
	  @Get(':id')
	  @Roles('admin')
	  async findOne(@Param('id') id: string) {
	    return this.usersService.findOne(+id);
	  }
	  /**
	   * Actualiza un usuario
	   * @param id - ID del usuario a actualizar
	   * @param userData - Datos a actualizar
	   * @returns - El usuario actualizado
	   */
	  @Put(':id')
	  @Roles('admin')
	  async update(@Param('id') id: string, @Body() userData: CreateUserDto) {
	    return this.usersService.update(+id, userData);
	  }
	  /**
	   * Elimina un usuario
	   * @param id - ID del usuario a eliminar
	   * @returns - Mensaje de confirmación
	   */
	  @Delete(':id')
	  @Roles('admin')
	  async remove(@Param('id') id: string) {
	    await this.usersService.remove(+id);
	    return { message: `Usuario con ID ${id} ha sido eliminado` };
	  }
	}   