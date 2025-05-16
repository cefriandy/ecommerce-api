import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findOrCreate(googleProfile: any): Promise<User> {
        const { id, displayName, emails, photos } = googleProfile;
        const sanitizedUsername = displayName.replace(/\s+/g, '').toLowerCase();

        let user = await this.userRepository.findOne({ where: { googleId: id } });

        if (!user) {
            user = this.userRepository.create({
                googleId: id,
                name: displayName,
                username: sanitizedUsername,
                email: emails[0].value,
                picture: photos?.[0]?.value,
            });
        }
        try {
            await this.userRepository.save(user);
        } catch (error) {
            console.error('Error saving user:', error);
        }

        return user;
    }
}