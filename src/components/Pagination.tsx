import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/static';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  count: number;
}

export default function Paggination({ count }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getPage = useCallback(() => {
    return Number(location.search.replace('?page=', '')) || 1;
  }, [location.search]);

  useEffect(() => {
    setCurrentPage(getPage);
  }, [getPage, location]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => navigate(`${ROUTES.PRODUCTS}/?page=${value}`)

  return (
    <Stack spacing={2} sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginTop: '5rem', marginBottom: '1rem' }}>
      <Pagination
        count={count}
        page={currentPage}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
