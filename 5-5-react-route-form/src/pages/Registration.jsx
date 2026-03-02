import { useMemo, useState } from "react";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");

    const [errors, setErrors] = useState({});

    // Disable submit until all requirements met (live validity)
    const isFormValid = useMemo(() => {
        const e = email.trim();
        const p = password.trim();
        const g = gender.trim();

        const emailOk = e.includes("@") && e.endsWith(".com");
        const passwordOk = p.length > 0;
        const genderOk = g.length > 0;

        return emailOk && passwordOk && genderOk;
    }, [email, password, gender]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Form validations
        const newErrors = {};
        const eVal = email.trim();
        const pVal = password.trim();

        // Required
        if (!eVal) newErrors.email = "Email is required.";
        if (!pVal) newErrors.password = "Password is required.";
        if (!gender) newErrors.gender = "Gender is required.";

        // Email rule: contains "@" and ends with ".com"
        if (eVal && (!eVal.includes("@") || !eVal.endsWith(".com"))) {
            newErrors.email = 'Email must contain "@" and end with ".com".';
        }

        setErrors(newErrors);

        // Stop if errors exist
        if (Object.keys(newErrors).length > 0) return;

        alert("Registration successful!");

        // Reset after success
        setEmail("");
        setPassword("");
        setGender("");
        setErrors({});
    };

    return (
        <section>
            <h1>Student Registration</h1>
            <p className="muted">
                Create your portal access. Your email will be used for course updates.
            </p>

            <form onSubmit={handleSubmit} className="card form neon">
                <div className="form-row">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        placeholder="you@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="error">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="form-row">
                    {/*password*/}
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        placeholder="Enter password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    {errors.password && (
                        <p id="password-error" className="error">
                            {errors.password}
                        </p>
                    )}
                </div>

                <fieldset className="form-row">
                    {/*Radio Button for gender*/}
                    <legend>Gender</legend>

                    <label className="radio">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                    </label>

                    <label className="radio">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                    </label>



                    {errors.gender && <p className="error">{errors.gender}</p>}
                </fieldset>

                {/*Disable the submit button until all requirements met*/}
                <button type="submit" className="btn" disabled={!isFormValid}>
                    Register
                </button>
            </form>

            <div className="card info">
                <h3>Why Register?</h3>
                <ul className="list">
                    <li>📘 Access course materials & assignments</li>
                    <li>💬 Join the discussion forum</li>
                    <li>🎓 Track your progress & get certified</li>
                </ul>
            </div>
        </section>
    );
}
//done