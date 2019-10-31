import { useEffect } from 'react';
import { useQueryState } from 'react-router-use-location-state';
import { loggInngangFraKandidatsøk } from '../../api/målinger';

const INNGANG_KANDIDATSØK = 'kandidatsok';

const useLoggInngang = () => {
    const [inngang, setInngang] = useQueryState<string>('inngang', '');

    useEffect(() => {
        if (inngang === INNGANG_KANDIDATSØK) {
            setInngang('');
            loggInngangFraKandidatsøk();
        }
    }, [inngang, setInngang]);
};

export default useLoggInngang;
