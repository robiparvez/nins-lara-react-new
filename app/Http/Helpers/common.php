<?php

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

/**
 * Store a file in the storage.
 *
 * @param \Illuminate\Http\UploadedFile $file
 * @param string $uploadPath
 * @param string|"local" $disk
 * @return string
 */
function store_file(UploadedFile $file, string $uploadPath, string $disk = 'local')
{
    $random = Str::random();
    $extension = $file->extension();

    $fileName = "{$random}.{$extension}";

    $file->storeAs($uploadPath, $fileName, [
        'disk' => $disk,
    ]);

    return $fileName;
}

/**
 * Get the admin authentication guard instance.
 *
 * @return \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
 */
function adminGuard()
{
    return Auth::guard('api');
}
