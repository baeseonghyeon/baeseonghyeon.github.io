import { NextPage } from 'next';
import Layout from '../../components/Layout';
import { useRecoilState, useRecoilValue } from 'recoil';
import { textSelectorState, textState } from './todo';
import { ChangeEvent, ChangeEventHandler } from 'react';

export interface RecoilProps {}

const Recoil: NextPage = (props: RecoilProps) => {
    const {} = props;

    // Recoil Example
    const [text, setText] = useRecoilState(textState);
    // const text: string = useRecoilValue(textState);
    const { upperCaseText, prefixText } = useRecoilValue(textSelectorState);

    return (
        <Layout title="Recoil">
            <RecoilForm
                onChange={(e) => {
                    setText(e.target.value);
                }}
                value={text}
            />
            {text ? (
                <ul>
                    <li>
                        text: <strong>{text}</strong>
                    </li>
                    <li>
                        upper case text: <strong>{upperCaseText}</strong>
                    </li>
                    <li>
                        prefix text: <strong>{prefixText}</strong>
                    </li>
                </ul>
            ) : (
                <p>Noting here yet...</p>
            )}
        </Layout>
    );
};

export default Recoil;

interface RecoilFormProps {
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
    value: string;
}

export const RecoilForm = (props: RecoilFormProps) => {
    const { onChange, value } = props;
    return (
        <form>
            <label htmlFor="recoil">Recoil : </label>
            <input name="recoil" onChange={onChange} value={value} />
        </form>
    );
};
