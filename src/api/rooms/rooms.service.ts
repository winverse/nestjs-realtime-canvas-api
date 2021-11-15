import { redisGet, redisSet } from './../../lib/redis';
import { UserInfo } from './rooms.gateway';
import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import Utils from 'lib/utils';

const names = [
  'Eleanor Pena',
  'Leslie Alexandar',
  'Brooklyn Simmons',
  'Arlene McCoy',
  'Jerome Bell',
  'Darlene Robertson',
  'Kathryn Murphy',
  'Theresa Webb',
  'Darrerll Steward',
  'Kylian Mbappe',
  'David Alaba',
  'Sergio Ramos',
  'Thibaut Courtois',
];

@Injectable()
export class RoomsService {
  async enter() {
    const users: UserInfo[] = (await redisGet('users')) || [];

    const randomNumber = Utils.randomNumber(13);
    const thumbnailUrl = `http://localhost:3000/images/thumbnail_${randomNumber}.png`;
    const name = names[Utils.randomNumber(13)];
    const loggedUser = {
      id: nanoid(),
      name,
      socketId: null,
      thumbnail: thumbnailUrl,
      score: 0,
    };

    users.push(loggedUser);
    await redisSet('users', users);
    return { loggedUser };
  }
}
