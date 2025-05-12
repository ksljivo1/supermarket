import {useContext, useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Tabs,
    Tab,
    Box,
    FormHelperText,
    Snackbar,
    Alert
} from "@mui/material";
import { AppContext } from "../contexts/AppContext.jsx";


export default function Cart() {
    const { cart, getTotalPrice } = useContext(AppContext);
    const totalPrice = getTotalPrice();

    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) return;
        fetch("http://localhost:5255/api/Users/me", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.name)
                setUsername(data.name)
            })
    }, [loggedIn])

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (activeTab === 1) {
            if (!formData.name.trim()) {
                newErrors.name = "Name is required.";
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const url = activeTab === 0 ? "http://localhost:5255/api/Users/login" : "http://localhost:5255/api/Users/register";
        const payload = activeTab === 0
            ? { email: formData.email, password: formData.password }
            : { name: formData.name, email: formData.email, password: formData.password };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const error = await response.text();
                setErrors(prev => ({ ...prev, server: error }));
                return;
            }

            if (activeTab === 1) {
                setSnackbarOpen(true);
            }
            else {
                const data = await response.json();
                localStorage.setItem('jwt', data.token);
                setLoggedIn(true);
            }

            setOpen(false);
            setFormData({ name: "", email: "", password: "", confirmPassword: "" });
            setErrors({});
        } catch (err) {
            console.error("Error:", err);
            setErrors(prev => ({ ...prev, server: "Network error. Please try again." }));
        }
    };

    return (
        <>
            {loggedIn && <p>Logged in as {username}</p>}
            <table className="table table-cart">
                <thead>
                <tr>
                    <th width="25%" className="th-product">Product</th>
                    <th width="20%">Unit price</th>
                    <th width="10%">Quantity</th>
                    <th width="25%">Total</th>
                </tr>
                </thead>
                <tbody>
                {cart.map(product => (
                    <tr key={product.id}>
                        <td>
                            <img src={product.image} width="30" height="30" alt="" style={{ marginRight: "10px", verticalAlign: "middle" }} />
                            {product.name}
                        </td>
                        <td>${product.price}</td>
                        <td>{product.quantity}</td>
                        <td><strong>${product.price * product.quantity}</strong></td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan="2"></th>
                    <th className="cart-highlight">Total</th>
                    <th className="cart-highlight">${totalPrice}</th>
                </tr>
                <tr>
                    <td colSpan="4" style={{ textAlign: "right", paddingTop: "20px" }}>
                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                            sx={{
                                backgroundColor: 'var(--primary-2)',
                                color: 'var(--white)',
                                borderRadius: '30px',
                                padding: '10px 25px',
                                textTransform: 'none',
                                fontSize: '16px',
                                '&:hover': { backgroundColor: 'var(--primary-1)' }
                            }}
                        >
                            Checkout
                        </Button>
                    </td>
                </tr>
                </tfoot>
            </table>

            <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{
                sx: {
                    borderRadius: '20px',
                    padding: '10px',
                    backgroundColor: 'var(--white)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
            }}>
                <DialogTitle sx={{ color: 'var(--neutral-1)' }}>
                    {activeTab === 0 ? "Login" : "Register"}
                </DialogTitle>
                <DialogContent>
                    <Tabs
                        value={activeTab}
                        onChange={(e, val) => {
                            setActiveTab(val);
                            setErrors({});
                        }}
                        centered
                        TabIndicatorProps={{ style: { backgroundColor: 'var(--primary-2)' } }}
                        textColor="inherit"
                    >
                        <Tab label="Login" sx={{ color: 'var(--primary-2)' }} />
                        <Tab label="Register" sx={{ color: 'var(--primary-2)' }} />
                    </Tabs>

                    <Box mt={2}>
                        {activeTab === 1 && (
                            <TextField
                                fullWidth label="Name" name="name" margin="normal" variant="outlined"
                                value={formData.name} onChange={handleChange}
                                error={!!errors.name} helperText={errors.name}
                            />
                        )}
                        <TextField
                            fullWidth label="Email" name="email" margin="normal" variant="outlined"
                            value={formData.email} onChange={handleChange}
                            error={!!errors.email} helperText={errors.email}
                        />
                        <TextField
                            fullWidth label="Password" name="password" type="password" margin="normal" variant="outlined"
                            value={formData.password} onChange={handleChange}
                            error={!!errors.password} helperText={errors.password}
                        />
                        {activeTab === 1 && (
                            <TextField
                                fullWidth label="Confirm Password" name="confirmPassword" type="password"
                                margin="normal" variant="outlined"
                                value={formData.confirmPassword} onChange={handleChange}
                                error={!!errors.confirmPassword} helperText={errors.confirmPassword}
                            />
                        )}
                        {errors.server && (
                            <FormHelperText error sx={{ mt: 1 }}>
                                {errors.server}
                            </FormHelperText>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: '20px' }}>
                    <Button onClick={() => setOpen(false)} sx={{ color: 'var(--neutral-2)' }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: 'var(--primary-2)',
                            color: 'var(--white)',
                            borderRadius: '30px',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'var(--primary-1)' }
                        }}
                    >
                        {activeTab === 0 ? "Login" : "Register"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
                    Registration successful!
                </Alert>
            </Snackbar>
        </>
    );
}
