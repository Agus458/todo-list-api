import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity('todos')
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column({
        default: false
    })
    done: boolean;
    
    @ManyToOne(() => User, user => user.todos)
    user: User;
}