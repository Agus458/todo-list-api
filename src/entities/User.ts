import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, Table } from "typeorm";
import { Todo } from "./Todo";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nick: string;

    @OneToMany(() => Todo, todo => todo.user, {
        cascade: true
    })
    todos: Todo[];
}