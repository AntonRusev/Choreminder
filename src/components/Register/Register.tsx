export const Register = () => {
    return (
        <main>
            <form action="post">

                {/* Email */}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="rePass">Repeat password:</label>
                    <input type="password" id="rePass" name="rePass" />
                </div>

                {/* Submit Button */}

                <div>
                    <input type="submit" value="Login" />
                </div>

            </form>
        </main>
    );
};