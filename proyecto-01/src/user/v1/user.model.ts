// DECLARE USER MODEL TYPE
type UserType = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    active: boolean;
};

// CLASS TO SIMULATE SCHEMA FUNCTIONALITY
class User {
    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public role: 'user' | 'admin';
    public active: boolean;

    constructor(user: UserType) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.active = user.active;
    }

    // Method to deactivate the user (soft delete)
    deactivate() {
        this.active = false;
    }

    // Method to check if user is admin
    isAdmin() {
        return this.role === 'admin';
    }
}

export { User, UserType };
