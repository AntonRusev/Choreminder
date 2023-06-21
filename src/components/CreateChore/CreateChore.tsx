export const CreateChore = () => {
    return (
        <main>
            <form action="post">
                {/* Chore Name */}
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                {/* Chore cycle timer */}
                <div>
                    <label htmlFor="time">Days:</label>
                    <input type="number" id="time" name="time" />
                </div>
                {/* IMG link for picture @OPTIONAL */}
                <div>
                    <label htmlFor="img">Image URL (Optional)</label>
                    <input type="text" id="img" name="img" />
                </div>
            </form>
        </main>
    );
};