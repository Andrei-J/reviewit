import { Form, Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { AccountSuspendedModal } from '@/components/account-suspended-modal';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import type { BannedAccountInfo, SharedData } from '@/types';

type Props = {
    status?: string;
    canResetPassword: boolean;
    banned?: BannedAccountInfo | null;
};

export default function Login({ status, canResetPassword, banned }: Props) {
    const { props } = usePage<SharedData & Props>();
    const pageBanned = banned || props.flash?.banned_account;
    const pageErrors = props.errors as Record<string, string> | undefined;

    const isSuspended =
        Boolean(pageBanned) ||
        Boolean(pageErrors?.email?.toLowerCase().includes('suspended'));

    const [isSuspendedModalOpen, setIsSuspendedModalOpen] =
        useState(isSuspended);

    useEffect(() => {
        if (isSuspended) {
            setIsSuspendedModalOpen(true);
        }
    }, [isSuspended]);

    return (
        <>
            <Head title="Log in" />

            <PasskeyVerify />

            <AccountSuspendedModal
                isOpen={isSuspendedModalOpen}
                onClose={() => setIsSuspendedModalOpen(false)}
                reason={pageBanned?.reason}
                bannedAt={pageBanned?.banned_at}
                email={pageBanned?.email}
            />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    defaultValue={pageBanned?.email || ''}
                                    placeholder="email@example.com"
                                />
                                {errors.email &&
                                    (errors.email
                                        .toLowerCase()
                                        .includes('suspended') ? (
                                        <div className="mt-1 flex items-center justify-between text-xs text-rose-600 dark:text-rose-400">
                                            <span>
                                                Account suspended by
                                                administrator.
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsSuspendedModalOpen(
                                                        true,
                                                    )
                                                }
                                                className="cursor-pointer font-medium underline hover:text-rose-700 dark:hover:text-rose-300"
                                            >
                                                View details
                                            </button>
                                        </div>
                                    ) : (
                                        <InputError message={errors.email} />
                                    ))}
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Forgot your password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <TextLink href={register()} tabIndex={5}>
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
