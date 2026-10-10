<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class UserCommunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstWhere('email', 'admin@gmail.com');

        $mockUsers = [
            [
                'name' => 'Emma Wilson',
                'email' => 'emma.wilson@uni.edu',
                'plan' => 'premium',
                'banned_at' => null,
                'created_at' => Carbon::parse('2026-10-06 09:30:00'),
            ],
            [
                'name' => 'Liam Chen',
                'email' => 'liam.chen@uni.edu',
                'plan' => 'free',
                'banned_at' => null,
                'created_at' => Carbon::parse('2026-10-06 08:15:00'),
            ],
            [
                'name' => 'Sofia Patel',
                'email' => 'sofia.patel@uni.edu',
                'plan' => 'premium',
                'banned_at' => null,
                'created_at' => Carbon::parse('2026-10-05 14:45:00'),
            ],
            [
                'name' => 'Noah Garcia',
                'email' => 'noah.garcia@uni.edu',
                'plan' => 'free',
                'banned_at' => Carbon::parse('2026-10-05 16:00:00'),
                'ban_reason' => 'Repeated community guideline violations',
                'created_at' => Carbon::parse('2026-10-05 11:20:00'),
            ],
            [
                'name' => 'Ava Thompson',
                'email' => 'ava.thompson@uni.edu',
                'plan' => 'free',
                'banned_at' => null,
                'created_at' => Carbon::parse('2026-10-04 10:10:00'),
            ],
            [
                'name' => 'Oliver Smith',
                'email' => 'oliver.smith@uni.edu',
                'plan' => 'premium',
                'banned_at' => null,
                'created_at' => Carbon::parse('2026-10-04 09:05:00'),
            ],
            [
                'name' => 'Isabelle Brown',
                'email' => 'isabelle.brown@uni.edu',
                'plan' => 'free',
                'banned_at' => null,
                'created_at' => Carbon::parse('2026-10-03 17:30:00'),
            ],
            [
                'name' => 'Ethan Davis',
                'email' => 'ethan.davis@uni.edu',
                'plan' => 'premium',
                'banned_at' => Carbon::parse('2026-10-04 12:00:00'),
                'ban_reason' => 'Suspected unauthorized access attempt',
                'created_at' => Carbon::parse('2026-10-03 13:40:00'),
            ],
            [
                'name' => 'Mia Rodriguez',
                'email' => 'mia.rodriguez@uni.edu',
                'plan' => 'free',
                'banned_at' => null,
                'created_at' => Carbon::parse('2026-10-02 15:20:00'),
            ],
            [
                'name' => 'James Taylor',
                'email' => 'james.taylor@uni.edu',
                'plan' => 'free',
                'banned_at' => null,
                'created_at' => Carbon::parse('2026-10-02 11:00:00'),
            ],
        ];

        foreach ($mockUsers as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => 'password123',
                    'plan' => $data['plan'],
                    'banned_at' => $data['banned_at'] ?? null,
                    'ban_reason' => $data['ban_reason'] ?? null,
                    'banned_by_id' => ! empty($data['banned_at']) ? $admin?->id : null,
                    'created_at' => $data['created_at'],
                    'email_verified_at' => now(),
                ]
            );

            if (! $user->hasRole('student')) {
                $user->assignRole('student');
            }
        }
    }
}
