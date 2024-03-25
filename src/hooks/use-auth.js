import { useSelector } from 'react-redux';
export function useAuth() {
  const { email, token, id, name, displayName } = useSelector(
    (state) => state.user
  );
  return {
    isAutch: !!email,
    email,
    token,
    id,
    name,
    displayName,
  };
}
