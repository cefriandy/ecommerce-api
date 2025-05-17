import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly httpService: HttpService
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

    async fetchUsers(page: number = 1, results: number = 10, search?: string) {
        const url = `https://randomuser.me/api?results=${results}&page=${page}&seed=example`;
        const response = await firstValueFrom(this.httpService.get(url));
        const users = response.data.results;

        const transformed = users.map((user: { name: { title: any; first: any; last: any; }; location: { street: { number: any; name: any; }; city: any; state: any; country: any; }; email: any; registered: { age: { toString: () => any; }; }; phone: any; cell: any; picture: { large: any; medium: any; thumbnail: any; }; }) => ({
            name: `${user.name.title}. ${user.name.first} ${user.name.last}`,
            location: `${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
            email: user.email,
            age: user.registered.age.toString(),
            phone: user.phone,
            cell: user.cell,
            picture: [
                user.picture.large,
                user.picture.medium,
                user.picture.thumbnail,
            ],
        }));

        if (search) {
            const lowerSearch = search.toLowerCase();
            return transformed.filter((user) =>
                Object.values(user).some((value) => {
                    if (Array.isArray(value)) {
                        return value.some((v) => typeof v === 'string' && v.toLowerCase().includes(lowerSearch));
                    }
                    return typeof value === 'string' && value.toLowerCase().includes(lowerSearch);
                })
            );
        }

        return transformed;
    }
}