<?php

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

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
