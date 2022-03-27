<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory;
    use Notifiable;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'group_id', 'first_name', 'last_name', 'email', 'password', 'verified_at', 'status'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Group ownig this model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function group()
    {
        return $this->belongsTo(Group::class, 'group_id');
    }

    /**
     * Posts belonging to this model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'author_id');
    }

    /**
     * Get all the permissions belonging to this
     * user's group.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function permissions()
    {
        return $this->group->permissions;
    }

    /**
     * Check if this model has specified permission.
     *
     * @param string $permissionName
     * @return boolean
     */
    public function hasAccess(string $permissionName)
    {
        return $this->permissions()->where('name', $permissionName)->first()
            ? true
            : false;
    }

    /**
     * Check if this model has any of the specified
     * permissions.
     *
     * @param array $permissionNames
     * @return boolean
     */
    public function hasAnyAccess(array $permissionNames)
    {
        foreach ($this->permissions() as $permission) {
            if (in_array($permission->name, $permissionNames)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if this model has all of the specified
     * permission.
     *
     * @param array $permissionNames
     * @return boolean
     */
    public function hasAllAccess(array $permissionNames)
    {
        foreach ($this->permissions() as $permission) {
            if (!in_array($permission->name, $permissionNames)) {
                return false;
            }
        }

        return true;
    }
}
