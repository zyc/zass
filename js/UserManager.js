class UserManager {

    static get() {
        const string = localStorage.getItem(this.key);
        return string != null ? JSON.parse(string) : null;
    }

    static login(name) {
        if (name == null || name.trim().legth == 0) return null;

        const user = {
            id: nanoid(),
            name: name
        }

        localStorage.setItem(this.key, JSON.stringify(user));
        return user;
    }
}

UserManager.key = "user";
