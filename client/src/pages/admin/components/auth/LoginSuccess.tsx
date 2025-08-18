import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { setToken } from '../../../../helper/localSorageHelper';
// import { useNavigate } from 'react-router';

// const navigate = useNavigate();

export default function LoginSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    // If token is present, set it and navigate to admin page
    if (token) {
      toast.success("Login successful!");
      setToken(token);
      window.location.href = '/admin'
    }
  }, []);

  return <></>;
}
