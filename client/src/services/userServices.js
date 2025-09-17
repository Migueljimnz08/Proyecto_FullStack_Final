export const signUp = async (username, email, password) => {
    try{
        const res = await fetch(`http://localhost:3000/api/signup`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
            credentials: 'include', // importante para cookies
        });
        if (!res.ok) {
            throw new Error('Error signing up new user');
        }
        const confirmation = res.json()
        return confirmation.message;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const login = async (email, password) => {
    try{
        const res = await fetch(`http://localhost:3000/api/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', 
        });
        if (!res.ok) {
            throw new Error( 'Error loging in');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logout = async () => {
    try{
        const res = await fetch(`http://localhost:3000/api/logout`, {
            method: 'POST',
            credentials: 'include', 
        });
        if (!res.ok) {
            throw new Error('Error login out');
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message);
    } 
};