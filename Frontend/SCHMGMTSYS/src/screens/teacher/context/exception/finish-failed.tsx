import { FormProps, notification } from "antd";

export const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
    notification.error({
        message: 'Form Submission Error',
        description: (
            <div>
                <p>Please correct the following errors and try again:</p>
                <ul>
                    {errorInfo.errorFields.map((error) => (
                        <li key={error.name.toString()}>{error.name.join(' > ')}: {error.errors.join(', ')}</li>
                    ))}
                </ul>
            </div>
        ),
        placement: 'topRight',
        duration: 3,
    });
};
