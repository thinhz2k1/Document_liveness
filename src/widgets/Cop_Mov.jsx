// components
import Spring from '@components/Spring';
import Select from '@ui/Select';
import RangeDatePicker from '@ui/RangeDatePicker';
import DropFiles from '@components/DropFiles';
import PaymentMethod from '@ui/PaymentMethod';
import { toast } from 'react-toastify';
import MediaDropPlaceholder from '@ui/MediaDropPlaceholder';

// hooks
import { useForm, Controller } from 'react-hook-form';

// constants
import {
    PRODUCT_CATEGORIES,
    PAYMENT_OPTIONS,
    PRODUCT_TYPE_OPTIONS,
    PROMOTIONAL_OPTIONS,
    STOCK_STATUS_OPTIONS,
    UNITS_OPTIONS
} from '@constants/options';

// utils
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;

const CopMov = () => {
    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [result, setResult] = useState({});

    const submitForm = () => {
        const formData = new FormData();

        const token = localStorage.getItem('token');
        formData.append('image_text', file1);
        formData.append('image_mrz', file2);

        return fetch("http://192.168.0.126:8000/id_card/compare-info/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                }
                return response.json()
            })
            .then((data) => {
                console.log(data);
                setResult(data.comparison);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // do something with the data
    const handlePublish = data => {
        console.log(data);
        toast.success('Product published successfully');
    }

    // do something with the data
    const handleSave = data => {
        console.log(data);
        toast.info('Product saved successfully');
    }


    return (
        <Spring className="card flex-1 xl:py-10">
            <h5 className="mb-[15px]">Please input your images:</h5>
            <form className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,550px)] xl:gap-10">
                <div>
                    <div>
                        <span className="block field-label mb-2.5">Images</span>
                        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 2xl:grid-cols-[repeat(5,minmax(0,1fr))]">
                            <Controller name="image1"
                                control={control}
                                render={() => (
                                    <div>
                                        <h4>Front image</h4>
                                        <Input
                                            onChange={(event) => setFile1(URL.createObjectURL(event.target.files[0]))}
                                            type="file"
                                            id="picture"
                                        />
                                        <img src={file1} />
                                    </div>
                                )} />
                            <Controller name="image2"
                                control={control}
                                // defaultValue=""
                                render={() => (
                                    <div>
                                        <h4>Back image</h4>
                                        <Input
                                            onChange={(event) => setFile2(URL.createObjectURL(event.target.files[0]))}
                                            type="file"
                                            id="picture"
                                        />
                                        <img src={file2} />
                                    </div>
                                )} />
                            <button className="btn btn--primary md:mt-40" onClick={handleSubmit(submitForm)}>Show compare result</button>
                            <div>
                                {/* {result.result === true ? (
                                    <h5 style={{ color: 'green' }} className='btn btn--primary'>Qualified</h5>
                                ) : (
                                    <h5 style={{ color: 'red' }}>Unqualified</h5>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Spring>
    )
}

export default CopMov