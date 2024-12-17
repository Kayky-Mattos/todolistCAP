using my.schema as my from '../db/src/schema';
service TaskService {
    entity Tasks as projection on my.Tasks;
    entity Users as projection on my.Users;
}
