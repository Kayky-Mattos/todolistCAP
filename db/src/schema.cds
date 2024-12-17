namespace my.schema;

entity Users {
    key ID: UUID;
    name: String;
    tasks: Composition of many Tasks on tasks.user = $self; // Define a composição com a associação
}

entity Tasks {
    key ID: UUID;
    title: String;
    done: Boolean default false;
    dhDone: DateTime;
    user: Association to Users; // Associação gerenciada
}